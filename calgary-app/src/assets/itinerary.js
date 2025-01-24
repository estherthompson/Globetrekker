import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.5 10V7a1 1 0 0 1 1-1h1.813M4.5 10v10a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V10m-15 0h15m0 0V7a1 1 0 0 0-1-1h-2.281M7.312 6V3m0 3h8.907m0 0V3M8 14h8"
    />
  </svg>
)
export default SvgComponent
