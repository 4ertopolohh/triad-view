import { type CSSProperties, useMemo } from 'react';
import SuitsMeButton from '../../../../components/SuitsMeButton/SuitsMeButton';
import styles from '../ServiceCard/ServiceCard.module.scss';

import diagonalArrow from '../../../../assets/images/icons/diagonalArrow.png';
import servicesHorizontalArrow from '../../../../assets/images/icons/servicesHorizontalArrow.png';
import { Link } from 'react-router';

type ServiceCardArrowType = 'horizontal' | 'diagonal';
type ServiceCardVariant = 'black' | 'blue' | 'glass';
type ServiceCardStyle = CSSProperties & {
    [customProperty: `--${string}`]: string | undefined;
};

const CARD_HEIGHT = 443;
const BLOB_WIDTH = 260;
const BLOB_HEIGHT = 180;
const BLOB_KEYFRAME_POINTS = 7;
const BLOB_ANIMATION_DURATION_SECONDS = 20;

function getSeed(source: string): number {
    return source
        .split('')
        .reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 1), 0);
}

function getDeterministicInt(
    seed: number,
    index: number,
    min: number,
    max: number,
): number {
    const value = Math.abs(Math.sin(seed * 0.013 + index * 12.9898) * 43758.5453);
    const fraction = value - Math.floor(value);

    return Math.round(min + fraction * (max - min));
}

export type ServiceCardProps = {
    title: string;
    subtitle: string;
    price: string;
    spiral: string;
    width?: number;
    arrowType?: ServiceCardArrowType;
    variant?: ServiceCardVariant;
    padding?: number;
};

const serviceCardArrows: Record<ServiceCardArrowType, string> = {
    horizontal: servicesHorizontalArrow,
    diagonal: diagonalArrow,
};

const serviceCardButtonVariants: Record<ServiceCardVariant, 'white' | 'black'> = {
    glass: 'black',
    blue: 'white',
    black: 'white',
};

const ServiceCard = ({
    title,
    subtitle,
    price,
    spiral,
    width,
    arrowType = 'diagonal',
    variant = 'black',
    padding,
}: ServiceCardProps) => {
    const isGlassVariant = variant === 'glass';
    const resolvedCardWidth = width ?? BLOB_WIDTH;
    const glassSpiralStyle: CSSProperties | undefined =
        padding !== undefined && padding >= 20 ? { width: '90%' } : undefined;

    const blobStyleVars = useMemo<ServiceCardStyle>(() => {
        if (!isGlassVariant) {
            return {};
        }

        const maxX = Math.max(0, Math.round(resolvedCardWidth / 2 - BLOB_WIDTH / 2));
        const maxY = Math.max(0, Math.round(CARD_HEIGHT / 2 - BLOB_HEIGHT / 2));
        const seed = getSeed(`${title}-${subtitle}-${price}-${resolvedCardWidth}-${padding ?? 0}`);
        const styleVars: ServiceCardStyle = {
            '--blob-dur': `${BLOB_ANIMATION_DURATION_SECONDS}s`,
        };

        for (let pointIndex = 1; pointIndex <= BLOB_KEYFRAME_POINTS; pointIndex += 1) {
            const xKey = `--bx${pointIndex}` as `--${string}`;
            const yKey = `--by${pointIndex}` as `--${string}`;

            styleVars[xKey] = `${getDeterministicInt(seed, pointIndex * 2 - 1, -maxX, maxX)}px`;
            styleVars[yKey] = `${getDeterministicInt(seed, pointIndex * 2, -maxY, maxY)}px`;
        }

        return styleVars;
    }, [isGlassVariant, padding, price, resolvedCardWidth, subtitle, title]);

    const cardStyle: ServiceCardStyle = {
        ...(width !== undefined ? { width } : {}),
        ...(padding !== undefined ? { paddingLeft: padding, paddingRight: padding } : {}),
        ...blobStyleVars,
    };

    return(
        <Link to={'/chat'} className={`${styles.serviceCard} ${styles[variant]}`} style={cardStyle}>
            <img src={serviceCardArrows[arrowType]} alt="" loading='lazy' className={styles.arrow}/>
            <div className={styles.wrapper}>
                <img src={spiral} alt="" loading='lazy' className={styles.glassSpiral} style={glassSpiralStyle}/>
            </div>
            <div className={styles.desc}>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.subtitle}>{subtitle}</p>
                <p className={styles.price}>От {price} ₽</p>
            </div>
            <div className={styles.buttonWrapper}>
                <SuitsMeButton variant={serviceCardButtonVariants[variant]} />
            </div>
        </Link>
    )
}

export default ServiceCard;
