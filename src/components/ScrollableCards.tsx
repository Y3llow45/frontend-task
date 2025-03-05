import { Grid } from '@mui/joy'
import React, { useCallback, useEffect, useState } from 'react'
import { PageRequest } from '../services/dto/page.request.ts'
import { PageResponse } from '../services/dto/page.response.ts'
import { BannerService } from '../services/banner.service.ts';

export default function ScrollableCards<T>(props: {
    page: number
    loadMore: (page: PageRequest) => Promise<PageResponse<T> | undefined>
    mapCard: (value: T, deleteItem: (id: string) => void) => React.JSX.Element
    skeletonMap: (_: any, index: number) => React.JSX.Element
}) {
    const [cards, setCards] = useState<React.JSX.Element[]>([])

    const deleteItem = useCallback((id: string) => {
        setCards((prevCards) => prevCards.filter((card) => card.key !== id));
    }, []);

    const loadBanners = useCallback(async () => {
        const response = await props.loadMore({ page: props.page, pageSize: BannerService.PAGE_SIZE });
        if (!response || !response.content) return;
        const newCards = response.content.map((value) => props.mapCard(value, deleteItem));
        setCards(newCards);
    }, [props.page, props.loadMore, deleteItem]);

    useEffect(() => {
        loadBanners().catch((reason) => console.error(reason));
    }, [loadBanners]);

  return <Grid container spacing={2}>{cards}</Grid>;
}
