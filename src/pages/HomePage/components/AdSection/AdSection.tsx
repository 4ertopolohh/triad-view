import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import { useIntersectionState } from '../../../../hooks/useIntersectionState';
import WantButton from '../WantButton/WantButton';
import styles from '../AdSection/AdSection.module.scss';

const SECTION_MIN_HEIGHT = 1081;
const INITIAL_TITLE_MARGIN = 1500;
const TARGET_TITLE_MARGIN = 100;
const INITIAL_DESCRIPTION_MARGIN = 1500;
const TARGET_DESCRIPTION_MARGIN = 10;
const TITLE_TRIGGER_OFFSET = 10;
const TITLE_SCROLL_SPEED = 1.1;
const DESCRIPTION_SCROLL_SPEED = 0.8;

const AdSection = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const descriptionRef = useRef<HTMLDivElement | null>(null);
    const frameIdRef = useRef(0);
    const needsMeasurementRef = useRef(true);
    const measurementsRef = useRef({
        containerTop: 0,
        titleHeight: 0,
        descriptionHeight: 0,
    });
    const isRuntimeActive = useIntersectionState(sectionRef, {
        threshold: 0,
        rootMargin: '900px 0px',
        fallbackInView: true,
        initialInView: true,
    });

    const applyStyles = useCallback(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const { containerTop, titleHeight, descriptionHeight } = measurementsRef.current;
        const triggerStartScroll = Math.max(
            containerTop - (window.innerHeight - TITLE_TRIGGER_OFFSET),
            0,
        );
        const effectiveScroll = Math.max(window.scrollY - triggerStartScroll, 0);
        const nextTitleMargin = Math.min(
            INITIAL_TITLE_MARGIN,
            Math.max(INITIAL_TITLE_MARGIN - effectiveScroll * TITLE_SCROLL_SPEED, TARGET_TITLE_MARGIN),
        );
        const nextDescriptionMargin = Math.min(
            INITIAL_DESCRIPTION_MARGIN,
            Math.max(
                INITIAL_DESCRIPTION_MARGIN - effectiveScroll * DESCRIPTION_SCROLL_SPEED,
                TARGET_DESCRIPTION_MARGIN,
            ),
        );
        const nextSectionHeight = Math.max(
            SECTION_MIN_HEIGHT,
            nextTitleMargin + titleHeight,
            nextDescriptionMargin + descriptionHeight,
        );

        section.style.setProperty(
            '--title-translate-y',
            `${nextTitleMargin - TARGET_TITLE_MARGIN}px`,
        );
        section.style.setProperty(
            '--description-translate-y',
            `${nextDescriptionMargin - TARGET_DESCRIPTION_MARGIN}px`,
        );
        section.style.setProperty('--ad-section-height', `${nextSectionHeight}px`);
    }, []);

    const measureLayout = useCallback(() => {
        const container = containerRef.current;
        const title = titleRef.current;
        const description = descriptionRef.current;

        if (!container || !title || !description) {
            return;
        }

        measurementsRef.current = {
            containerTop: container.getBoundingClientRect().top + window.scrollY,
            titleHeight: title.offsetHeight,
            descriptionHeight: description.offsetHeight,
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

        const title = titleRef.current;
        const description = descriptionRef.current;
        const container = containerRef.current;
        let isDisposed = false;
        let resizeObserver: ResizeObserver | null = null;

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                scheduleFrame(true);
            });

            if (title) {
                resizeObserver.observe(title);
            }

            if (description) {
                resizeObserver.observe(description);
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

    return (
        <section ref={sectionRef} className={styles.adSection}>
            <div ref={containerRef} className={`container ${styles.container}`}>
                <h1 ref={titleRef} className={styles.title}>Сайт - старт успеха</h1>

                <div ref={descriptionRef} className={styles.description}>
                    <p className={styles.subtitle}>
                        Хотите, чтобы ваш бизнес вышел на новый уровень? Мы создадим сайт, который станет мощным
                        инструментом карьерного роста. Надёжная платформа, современный дизайн, продуманная структура и
                        чистый код.
                    </p>
                    <WantButton />
                </div>
            </div>
        </section>
    );
};

export default AdSection;
