import NextImage, { ImageProps } from 'next/image'

const Image: React.FC<React.PropsWithChildren<ImageProps>> = (props) => {
  return <NextImage {...props} />
}

export default Image
