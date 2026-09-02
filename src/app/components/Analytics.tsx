'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { trackClientEvent } from '@/lib/analytics';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-WCL9JTB6TC';
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_wLA9gRd7oxsendn9i2z7CppaytbHaokeZTUwGPPEi4eJ';
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

export default function Analytics() {
  const pathname = usePathname();
  const pageStartTimeRef = useRef<number>(Date.now());
  const hasClickedOutboundRef = useRef<boolean>(false);
  const maxScrollRef = useRef<number>(0);

  // 1. Track Pageviews and Reset Churn Timers on Route Changes
  useEffect(() => {
    pageStartTimeRef.current = Date.now();
    hasClickedOutboundRef.current = false;
    maxScrollRef.current = 0;

    trackClientEvent('pageview', {
      path: pathname,
      referrer: document.referrer || undefined
    });
  }, [pathname]);

  // 2. Measure Scroll Depth for Engagement & Churn Quality
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      const percent = Math.round(((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100) || 0;
      if (percent > maxScrollRef.current) {
        maxScrollRef.current = percent;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Automated Outbound Affiliate Click Interceptor
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const isOutboundRedirect = href.startsWith('/go/');
      const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);

      if (isOutboundRedirect || isExternal) {
        hasClickedOutboundRef.current = true;
        const toolSlug = isOutboundRedirect ? href.replace('/go/', '').split('?')[0] : undefined;
        const toolName = target.getAttribute('data-tool-name') || target.textContent?.trim() || toolSlug;
        const category = target.getAttribute('data-category') || undefined;

        trackClientEvent('outbound_click', {
          toolSlug,
          toolName,
          destinationUrl: href,
          category,
          path: pathname
        });
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [pathname]);

  // 4. Detailed Churn Tracker: Fires when user leaves or hides tab without clicking outbound links
  useEffect(() => {
    const handleExit = () => {
      // If user converted (clicked an affiliate link), it is a conversion, not a churn!
      if (hasClickedOutboundRef.current) return;

      const durationSeconds = Math.round((Date.now() - pageStartTimeRef.current) / 1000);
      // If user stayed > 1 second and left without converting
      if (durationSeconds >= 1) {
        trackClientEvent('session_churn', {
          path: pathname,
          durationSeconds,
          scrollDepth: maxScrollRef.current,
          metadata: {
            reason: durationSeconds < 10 ? 'quick_bounce' : 'browsed_without_click',
            maxScroll: maxScrollRef.current
          }
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleExit();
      }
    };

    window.addEventListener('beforeunload', handleExit);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleExit);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);

  return (
    <>
      {/* Google Analytics 4 (GA4) */}
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `}
          </Script>
        </>
      ) : null}

      {/* PostHog Web Snippet */}
      {POSTHOG_KEY ? (
        <Script id="posthog-js" strategy="afterInteractive">
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p=null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="al ol ll init Il Rl Tl Ml Ol za El Dl Sl capture getExtension Pl nl Hl calculateEventProperties Bl register register_once register_for_session unregister unregister_for_session Vl Cl zl getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync Gl identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset Zl shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty Ul ql createPersonProfile setInternalOrTestUser Wl ul hl opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing $l debug Ua Jn getPageViewId captureTraceFeedback captureTraceMetric bl".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('${POSTHOG_KEY}', {
              api_host: '${POSTHOG_HOST}',
              defaults: '2026-05-30',
              person_profiles: 'identified_only',
              autocapture: true,
              capture_pageview: true,
              capture_pageleave: true
            });
          `}
        </Script>
      ) : null}
    </>
  );
}
