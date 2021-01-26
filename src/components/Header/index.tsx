/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { HeaderWrapper } from '@/styles/components/header';

export default function Header(props) {
  return (
    <HeaderWrapper {...props}>
      <Link href="./">
        <a>
          <img src="/random-quiz.png" alt="Random Quiz" />
        </a>
      </Link>
    </HeaderWrapper>
  );
}
