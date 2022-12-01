import NextImage, { ImageProps } from 'next/image'

const Image: React.FC<ImageProps> = (props) => {
  return <NextImage {...props} />
}

export default Image
