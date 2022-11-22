/* eslint-disable react/jsx-key */
import React from "react";
import styles from './styles.module.scss';

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' 
import { Nota } from "../utils/CreateSVG";

interface Props {
    pool: {
        title: string,
        nota: number,
        description: string,
        avatar: string,
        userpool: {
            name: string,
        }
    }
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

    const nota = [
      {
        nota: 
        pool.nota  === 1 && <><Nota/></> || 
        pool.nota === 2 && <><Nota/><Nota/></> || 
        pool.nota === 3 && <><Nota/><Nota/><Nota/></> ||
         pool.nota === 4 && <><Nota/><Nota/><Nota/><Nota/></> || 
         pool.nota === 5 && <><Nota/><Nota/><Nota/><Nota/><Nota/></> ,
      }
    ]
    
  return (
    <>
                  <div className={styles.listCarousel}>
                      <div className="keen-slider__slide" id={styles.listCarouselItem}>
                              {pool ? (
                                <>
                                  <div className={styles.profile}>
                              <img src={pool.avatar} alt="" />
                                  <span>{pool.userpool.name}</span>
                                  <span className={styles.nota}>
                                    {nota.map(react => {
                                      return (
                                        <>
                                          {react.nota}
                                        </>
                                      )
                                    })}
                                  </span>
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