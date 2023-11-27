'use client';

import { getAnimes } from '@/app/action';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

let page = 2;

type AnimeCard = JSX.Element;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    if (inView) {
      getAnimes(page).then((res) => {
        setData((prev) => [...prev, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      {data}
      <section className='flex justify-center items-center w-full'>
        <div ref={ref}>
          <Image
            src='./spinner.svg'
            alt='spinner'
            width={56}
            height={56}
            className='object-contain'
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
