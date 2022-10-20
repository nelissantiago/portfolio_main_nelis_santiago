import {  useRouter } from "next/router";
import { Video } from "../../components/ListContent/CreateContent";

export default function Account() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <div>
        <main>
          {slug
            ? <Video lessonSlug={slug}/>
            : ''}
        </main>
    </div>
    </>
  )
}
