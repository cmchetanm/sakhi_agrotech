import HeroSection from "@/components/sections/HeroSection";
import WhySakhiSection from "@/components/sections/WhySakhiSection";
import JourneySection from "@/components/sections/JourneySection";
import ProduceSection from "@/components/sections/ProduceSection";
import ResearchSection from "@/components/sections/ResearchSection";
import StoriesSection from "@/components/sections/StoriesSection";
import TeamSection from "@/components/sections/TeamSection";
import JoinSection from "@/components/sections/JoinSection";
import SiteFooter from "@/components/layout/SiteFooter";
import { STATIC_TEAM } from "@/content/site";
import { getCarouselImages, getInitiatives, getSiteConfig, getTeamMembers } from "@/lib/api";
import { IMAGES } from "@/lib/assets";
import { normalizeMediaUrl, preferStaticImage } from "@/lib/media";

export default async function HomePage() {
  const [carouselImages, rawInitiatives, rawTeamMembers, siteConfig] = await Promise.all([
    getCarouselImages().catch(() => []),
    getInitiatives().catch(() => []),
    getTeamMembers().catch(() => []),
    getSiteConfig().catch(() => ({ whatsapp_number: null, youtube_video_id: null, site_name: "", tagline: "" })),
  ]);

  const heroImage = preferStaticImage(
    normalizeMediaUrl(carouselImages[0]?.image),
    IMAGES.hero
  );
  const initiatives = rawInitiatives.map((item) => ({
    ...item,
    images: item.images.length
      ? item.images.map((img) =>
          preferStaticImage(normalizeMediaUrl(img), IMAGES.produceBasket)
        )
      : [IMAGES.produceBasket],
    overlay_image: normalizeMediaUrl(item.overlay_image),
  }));
  const teamMembers = rawTeamMembers.map((member) => {
    const photo = normalizeMediaUrl(member.photo);
    return {
      ...member,
      photo: photo && !photo.includes("/rails/active_storage") ? photo : null,
    };
  });
  const members = teamMembers.length > 0 ? teamMembers : STATIC_TEAM;

  return (
    <>
      <HeroSection heroImage={heroImage} />
      <WhySakhiSection />
      <JourneySection />
      <ProduceSection initiatives={initiatives} />
      <ResearchSection />
      <StoriesSection />
      <TeamSection members={members} />
      <JoinSection whatsappNumber={siteConfig.whatsapp_number} />
      <SiteFooter />
    </>
  );
}
