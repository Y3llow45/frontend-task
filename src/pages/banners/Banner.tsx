import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePageData } from '../../context/page-data/page-data.context.ts'
import BannerForm from '../../components/BannerForm.tsx'
import BannerService from '../../services/banner.service.ts'
import { BannerDto } from '../../services/dto/banner.dto.ts'

export default function Banner() {
    const { setPageData } = usePageData()
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [banner, setBanner] = useState<BannerDto | null>(null)

    useEffect(() => {        
        if (id) {
            setPageData({ title: `Banners > Edit ${id}` })
            BannerService.getBanner(id).then((data) => {
                if (data) {
                    setBanner(data);
                }
            });
        }
    }, [setPageData, id])

    const handleSubmit = async (data: BannerDto) => {
        await BannerService.updateBanner(id!, data);
        navigate('/banners');
        };
    
        if (!banner || !id) {
            return <div>Loading...</div>;
        }
    
    return <BannerForm initialData={banner} onSubmit={handleSubmit} submitLabel="Save Changes" />;
}
