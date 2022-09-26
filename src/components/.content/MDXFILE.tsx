import React, { useMemo } from 'react';
import { ComponentMap, getMDXComponent } from 'mdx-bundler/client';
import Image from 'next/image';
import {CustomLink} from './Link';

interface Props {
  layout: string;
  mdxSource: string;
  [key: string]: unknown;
}


const components: ComponentMap = {
  Image,
  Link: CustomLink,
};


export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const Component = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <Component {...rest} components={components} />;
};