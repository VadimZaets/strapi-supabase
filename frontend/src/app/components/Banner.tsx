import Image from "next/image";
import { Banner } from "@/lib/api";
import styles from "./Banner.module.css";

interface BannerComponentProps {
  banners: Banner[];
}

export default function BannerComponent({ banners }: BannerComponentProps) {
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className={styles.bannersContainer}>
      {banners.map((banner) => (
        <div key={banner.id} className={styles.banner}>
          {banner.backgroundImage && banner.backgroundImage.length > 0 && (
            <div className={styles.imageContainer}>
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${banner.backgroundImage[0].url}`}
                alt={banner.backgroundImage[0].alternativeText || banner.Title}
                width={banner.backgroundImage[0].width}
                height={banner.backgroundImage[0].height}
                className={styles.backgroundImage}
                priority
              />
            </div>
          )}
          <div className={styles.content}>
            <div className={styles.textContent}>
              {banner.Icon && <div className={styles.icon}>⭐</div>}
              <h2 className={styles.title}>{banner.Title}</h2>
              {banner.Desription && (
                <p className={styles.description}>{banner.Desription}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
