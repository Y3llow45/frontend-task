import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import BannerService from '../../services/banner.service.ts'
import { usePageData } from '../../context/page-data/page-data.context.ts'
import { v4 as uuidv4 } from 'uuid'
import BannerForm from '../../components/BannerForm.tsx'
import { BannerDto } from '../../services/dto/banner.dto.ts'

export default function BannerCreate() {
    const navigate = useNavigate()
    const { setPageData } = usePageData()

    useEffect(() => {
        setPageData({ title: 'Banners > Create' })
    }, [setPageData])

    const handleSubmit = async (data: { id?: string; link: string; imageUrl: string }) => {
        const bannerData: BannerDto = { ...data, id: uuidv4() }
        await BannerService.createBanner(bannerData)
        navigate('/banners')
    }

    return <BannerForm onSubmit={handleSubmit} submitLabel="Create Banner" />;
}
