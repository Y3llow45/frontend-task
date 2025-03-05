import BannerService from '../../services/banner.service.ts'
import { BannerService as BannerServiceClass } from '../../services/banner.service.ts'
import ScrollableCards from '../../components/ScrollableCards.tsx'
import { useEffect, useState } from 'react'
import { usePageData } from '../../context/page-data/page-data.context.ts'
import BannerCard from '../../components/banner/BannerCard.tsx'
import FAB from '../../components/FAB.tsx'
import { Button, Grid, Typography } from '@mui/joy'

export default function Banners() {
    const { setPageData } = usePageData()
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)

    useEffect(() => {
        setPageData({ title: 'Banners' })
        BannerService.getBanners({page: 0, pageSize: BannerServiceClass.PAGE_SIZE})
            .then((response) => {
                if(response) {
                    setCurrentPage(response.pageNumber)
                    const totalBanners = JSON.parse(localStorage.getItem('banners') || '[]').length
                    setTotalPages(Math.ceil(totalBanners / BannerServiceClass.PAGE_SIZE))
                }
            })
    }, [setPageData])

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    return (
        <>
            <ScrollableCards
                page={currentPage}
                loadMore={(page) =>
                    BannerService.getBanners({ page: page.page, pageSize: BannerServiceClass.PAGE_SIZE })
                }
                mapCard={(banner, deleteItem) => (
                <BannerCard
                    key={banner.id}
                    banner={banner}
                    delete={async () => {
                        deleteItem(banner.id!)
                        BannerService.deleteBanner(banner.id!)
                          .catch((reason) => console.error(reason))
                    } } />
                )}
            skeletonMap={(_, i) => <BannerCard key={'skeleton-' + i} />} />
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                <Button
                    disabled={currentPage === 0}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </Button>
                <Typography>
                    Page {currentPage + 1} of {totalPages}
                </Typography>
                <Button
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </Button>
            </Grid>
            <FAB />
        </>
    )
}
