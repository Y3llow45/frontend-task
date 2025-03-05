import { Button, Input, Grid } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import BannerService from '../../services/banner.service.ts'
import { usePageData } from '../../context/page-data/page-data.context.ts'
import { v4 as uuidv4 } from 'uuid'

export default function BannerCreate() {
    const navigate = useNavigate()
    const { setPageData } = usePageData()

    useEffect(() => {
        setPageData({ title: 'Banners > Create' })
    }, [setPageData])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const titleInput = form.elements.namedItem('title') as HTMLInputElement
        const imageInput = form.elements.namedItem('image') as HTMLInputElement
        const data = {
            id: uuidv4(),
            link: titleInput.value,
            imageUrl: imageInput.value,
        }
        await BannerService.createBanner(data)
        form.reset()
        navigate('/banners')
    }

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
            <Input name="title" placeholder="Banner Title" sx={{ mb: 2 }} required />
            <Input name="image" placeholder="Image URL" sx={{ mb: 2 }} required />
            <Button type="submit">Create Banner</Button>
        </form>
    </Grid>
  )
}
