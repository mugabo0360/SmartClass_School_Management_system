/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Add this line to fix the CSS import warning
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}