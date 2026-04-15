import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import ContactsButton from '../../../../components/ContactsButton/ContactsButton';
import { useIntersectionState } from '../../../../hooks/useIntersectionState';
import styles from '../SupportSection/SupportSection.module.scss';

const SECTION_MIN_HEIGHT = 1650;
const INITIAL_CONTENT_MARGIN = 900;
const TARGET_CONTENT_MARGIN = 110;
const CONTENT_TRIGGER_OFFSET = 1;
const CONTENT_SCROLL_SPEED = 0.4;

const SupportSection = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const frameIdRef = useRef(0);
    const needsMeasurementRef = useRef(true);
    const measurementsRef = useRef({
        containerTop: 0,
        contentHeight: 0,
    });
    const isRuntimeActive = useIntersectionState(sectionRef, {
        threshold: 0,
        rootMargin: '1100px 0px',
        fallbackInView: true,
    });

    const applyStyles = useCallback(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const { containerTop, contentHeight } = measurementsRef.current;
        const triggerStartScroll = Math.max(
            containerTop - (window.innerHeight - CONTENT_TRIGGER_OFFSET),
            0,
        );
        const effectiveScroll = Math.max(window.scrollY - triggerStartScroll, 0);
        const nextContentMargin = Math.min(
            INITIAL_CONTENT_MARGIN,
            Math.max(
                INITIAL_CONTENT_MARGIN - effectiveScroll * CONTENT_SCROLL_SPEED,
                TARGET_CONTENT_MARGIN,
            ),
        );
        const nextSectionHeight = Math.max(
            SECTION_MIN_HEIGHT,
            nextContentMargin + contentHeight,
        );

        section.style.setProperty(
            '--content-translate-y',
            `${nextContentMargin - TARGET_CONTENT_MARGIN}px`,
        );
        section.style.setProperty('--support-section-height', `${nextSectionHeight}px`);
    }, []);

    const measureLayout = useCallback(() => {
        const container = containerRef.current;
        const content = contentRef.current;

        if (!container || !content) {
            return;
        }

        measurementsRef.current = {
            containerTop: container.getBoundingClientRect().top + window.scrollY,
            contentHeight: content.offsetHeight,
        };
    }, []);

    const flushAnimationFrame = useCallback(() => {
        frameIdRef.current = 0;

        if (needsMeasurementRef.current) {
            measureLayout();
            needsMeasurementRef.current = false;
        }

        applyStyles();
    }, [applyStyles, measureLayout]);

    const scheduleFrame = useCallback((needsMeasurement: boolean) => {
        if (needsMeasurement) {
            needsMeasurementRef.current = true;
        }

        if (frameIdRef.current) {
            return;
        }

        frameIdRef.current = window.requestAnimationFrame(flushAnimationFrame);
    }, [flushAnimationFrame]);

    useLayoutEffect(() => {
        if (!isRuntimeActive) {
            return;
        }

        measureLayout();
        applyStyles();
    }, [applyStyles, isRuntimeActive, measureLayout]);

    useEffect(() => {
        if (!isRuntimeActive) {
            if (frameIdRef.current) {
                window.cancelAnimationFrame(frameIdRef.current);
                frameIdRef.current = 0;
            }

            return;
        }

        const handleScroll = () => {
            scheduleFrame(false);
        };

        const handleResize = () => {
            scheduleFrame(true);
        };

        const content = contentRef.current;
        const container = containerRef.current;
        let isDisposed = false;
        let resizeObserver: ResizeObserver | null = null;

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                scheduleFrame(true);
            });

            if (content) {
                resizeObserver.observe(content);
            }

            if (container) {
                resizeObserver.observe(container);
            }
        }

        document.fonts?.ready
            .then(() => {
                if (!isDisposed) {
                    scheduleFrame(true);
                }
            })
            .catch(() => {
                if (!isDisposed) {
                    scheduleFrame(true);
                }
            });

        scheduleFrame(true);

        return () => {
            isDisposed = true;
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            resizeObserver?.disconnect();

            if (frameIdRef.current) {
                window.cancelAnimationFrame(frameIdRef.current);
                frameIdRef.current = 0;
            }
        };
    }, [isRuntimeActive, scheduleFrame]);

    return(
        <section ref={sectionRef} className={styles.supportSection}>
            <div ref={containerRef} className={`container ${styles.container}`}>
                <div ref={contentRef} className={styles.content}>
                    <h3>поддержка после релиза</h3>
                    <p>После запуска вашего сайта мы оказываем постоянную и качественную поддержку. Доработки, переделки, техобслуживание, наполнение контентом и прочие услуги доступны всем нашим клиентам и не только.</p>
                    <ContactsButton text='нужна доработка сайта' width={850} height={50} borderRadius={25}/>
                </div>
            </div>
        </section>
    );
};

export default SupportSection;
