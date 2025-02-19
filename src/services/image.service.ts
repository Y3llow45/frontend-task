class ImageService {
    async fetchImage(url: string) {
        try {
            const response = await fetch(url)

            if (response.ok) {
                const blob = await response.blob()
                return URL.createObjectURL(blob)
            }
        } catch (error) {
            console.error('Error loading image:', error)
        }
        return null
    }
}

export default new ImageService()
