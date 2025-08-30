import Image from 'next/image'

const ImageBlock = ({
    imageUrl,
    altText,
}: {
    imageUrl: string
    altText: string
}) => {
    return (
        <div className="w-[90vw] lg:-ml-30 md:-ml-22 sm:-ml-14 xs:-ml-8 -ml-5 object-cover rounded-br-[20vw]">
            <Image
                src={imageUrl}
                width={100}
                height={100}
                className="w-full rounded-br-[20vw] object-cover"
                alt={altText}
            />
        </div>
    )
}

export default ImageBlock
