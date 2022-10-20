import  Link  from 'next/link';
import styles from './styles.module.scss';

interface LessonProps {
  title: string,
  description: string,
  slug: string,
} 

export function Lesson({ title, slug, description }: LessonProps) {
  return (
    <article  className={styles.SearchContent}>
      <Link href={`/content/${slug}`} className="group">  
            <div className={styles.listContent}>
              <div className={styles.text}>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </div>
      </Link >
    </article>
  );
}