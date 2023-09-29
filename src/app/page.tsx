import Hero from "@/components/Hero"
import OrganizationsSection from "@views/homepage/OrganizationsSections"
import TopVideosSection from "@views/homepage/TopVideosSection"
import CaseFormSection from "@views/homepage/SubmitFormSection"
import FeaturedCasesSection from "@views/homepage/FeaturedCasesSection"
import TopPodcastsSection from "@views/homepage/TopPodcastsSection"

export default function Home() {
  return (
    <main className="overflow-hidden text-white">
      <Hero />
      <FeaturedCasesSection />
      <TopVideosSection />
      <TopPodcastsSection />
      <OrganizationsSection />
      <CaseFormSection />
    </main>
  )
}
