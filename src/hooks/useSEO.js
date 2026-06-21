import { useEffect } from 'react';

export default function useSEO(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Acezon` : 'Acezon | Professional Academic Assistance & Tutoring';

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);
}
