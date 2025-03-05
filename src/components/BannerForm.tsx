import { Grid, Input, Button } from '@mui/joy';
import { FormEvent } from 'react';
import { BannerDto } from '../services/dto/banner.dto';

interface BannerFormProps {
    initialData?: BannerDto
    onSubmit: (data: { id: string; link: string; imageUrl: string }) => void
    submitLabel?: string
  }

export default function BannerForm({ initialData, onSubmit, submitLabel = 'Save' }: BannerFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const titleInput = form.elements.namedItem('title') as HTMLInputElement;
    const imageInput = form.elements.namedItem('image') as HTMLInputElement;
    const data = {
      id: initialData?.id || '',
      link: titleInput.value,
      imageUrl: imageInput.value,
    };
    onSubmit(data);
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          placeholder="Banner Title"
          defaultValue={initialData?.link || ''}
          sx={{ mb: 2 }}
          required
        />
        <Input
          name="image"
          placeholder="Image URL"
          defaultValue={initialData?.imageUrl || ''}
          sx={{ mb: 2 }}
          required
        />
        <Button type="submit">{submitLabel}</Button>
      </form>
    </Grid>
  );
}
