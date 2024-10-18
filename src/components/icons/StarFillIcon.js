import * as React from "react"
const StarFillIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 27}
    height={props.height || 25}
    fill="none"
    {...props}
  >
    <path
      fill={props.color || '#3E3E3E'}
      d="M12.549.927c.3-.921 1.603-.921 1.902 0l2.305 7.092a1 1 0 0 0 .95.691h7.458c.968 0 1.371 1.24.587 1.81l-6.033 4.383a1 1 0 0 0-.363 1.117l2.305 7.093c.299.921-.756 1.687-1.54 1.118l-6.032-4.384a1 1 0 0 0-1.176 0L6.88 24.232c-.783.57-1.838-.197-1.539-1.118l2.305-7.093a1 1 0 0 0-.363-1.117l-6.033-4.384C.465 9.95.868 8.71 1.836 8.71h7.457a1 1 0 0 0 .952-.69L12.549.926Z"
    />
  </svg>
)
export default StarFillIcon
