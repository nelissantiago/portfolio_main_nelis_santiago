/* eslint-disable react/jsx-key */
import React from "react";
import styles from './styles.module.scss';
import { avaliacoesProps } from "../../@types/interfaces"

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' 

interface Props {
    pool: avaliacoesProps
}

export function Carousel({ pool }: Props) { 
    const [sliderRef, instanceRef] = useKeenSlider(
      {
      slides: {
          perView: 1.544,
          spacing: 10,
      },
      mode: 'free-snap',
      },
    )

    console.log(pool.createdAt)


  
    console.log(pool.createdAt > pool.createdAt )
  return (
    <>
                  <div className={styles.listCarousel}>
                    <div className="keen-slider__slide" id={styles.listCarouselItem}>
                            {pool ? (
                              <>
                                <div className={styles.profile}>
                            <img src={pool.avatar} alt="" />
                                <span>{pool.name}</span>
                            </div>
                            <strong>{pool.title}</strong>
                            <p>
                                {pool.description}
                            </p>
                              </>
                            ) : (
                              <>
                                
                              </>
                            )}
                    </div>
                    </div>
    </>
  )
}


/**
 const GET_BY_AVALIATION_GRAPH = gql`
  query MyQuery {
      avaliationClientes(stage: PUBLISHED, orderBy: publishedAt_ASC) {
        conteudo
        avatar
        nome
        titulo
      }
    }
  `
  interface GetAssessmentsProps {
      avaliationClientes: {
          conteudo: string;
          avatar: string;
          nome: string;
          titulo: string;
      }[]
  }
 */