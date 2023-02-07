import Compressor from "compressorjs"

export function compressImage(file: File, width: number = 1080, height: number = 1080): Promise<File> {
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            maxWidth: width,
            maxHeight: height,
            success: (result) => resolve(result as File),
            error: reject,
        })
    })
}
