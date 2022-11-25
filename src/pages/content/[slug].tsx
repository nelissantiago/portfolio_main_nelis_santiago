import {  useRouter } from "next/router";
import {Props  } from "../../components/ListContent/CreateContent";
import { Video } from "../../components/ListContent/CreateContent";

type PropsPage = Props
export default function Account(props: PropsPage) {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <div>
        <main>
          {slug
            ? <Video lessonSlug={slug} content={props.content} />
            : ''}
        </main>
    </div>
    </>
  )
}
