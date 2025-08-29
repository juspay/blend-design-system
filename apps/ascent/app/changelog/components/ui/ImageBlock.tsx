import Image from 'next/image'

const ImageBlock = ({
    imageUrl,
    altText,
}: {
    imageUrl: string
    altText: string
}) => {
    return (
        <div className="w-[90vw] h-[60vh] object-fit rounded-br-[20vw]">
            <Image
                src={imageUrl}
                width={100}
                height={100}
                className="w-[1000px] rounded-br-[20vw] object-fit"
                alt={altText}
            />
        </div>
    )
}

export default ImageBlock
