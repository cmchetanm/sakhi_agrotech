import HeroSection from "@/components/sections/HeroSection";
import WhySakhiSection from "@/components/sections/WhySakhiSection";
import JourneySection from "@/components/sections/JourneySection";
import ProduceSection from "@/components/sections/ProduceSection";
import ResearchSection from "@/components/sections/ResearchSection";
import StoriesSection from "@/components/sections/StoriesSection";
import TeamSection from "@/components/sections/TeamSection";
import JoinSection from "@/components/sections/JoinSection";
import SiteFooter from "@/components/layout/SiteFooter";
import { mergeHomepageContent } from "@/lib/content/merge";
import { getHomepageContent } from "@/lib/api";

export default async function HomePage() {
  const apiContent = await getHomepageContent().catch(() => null);
  const content = mergeHomepageContent(apiContent);

  return (
    <>
      <HeroSection content={content.hero} />
      <WhySakhiSection content={content.why} />
      <JourneySection content={content.journey} />
      <ProduceSection content={content.produce} />
      <ResearchSection content={content.research} />
      <StoriesSection content={content.stories} />
      <TeamSection content={content.team} />
      <JoinSection content={content.join} whatsappNumber={content.site.whatsapp_number} />
      <SiteFooter content={content.footer} />
    </>
  );
}
