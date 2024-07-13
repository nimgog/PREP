import { Component, inject, input, OnInit, Renderer2 } from '@angular/core';
import { ProductStructuredData } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-structured-data',
  standalone: true,
  imports: [],
  template: ``,
})
export default class ProductStructuredDataComponent implements OnInit {
  private readonly renderer = inject(Renderer2);

  readonly product = input.required<ProductStructuredData>();

  ngOnInit(): void {
    const product = this.product();
    const jsonLd = this.createJsonLd(product);
    this.injectJsonLd(product.id, jsonLd);
  }

  injectJsonLd(productId: string, jsonLd: any) {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.id = `jld-${productId}`;
    script.text = JSON.stringify(jsonLd);

    const head = this.renderer.selectRootElement('head', true);
    const existingScript = head.querySelector(`#${script.id}`);

    if (existingScript) {
      this.renderer.removeChild(head, existingScript);
    }

    this.renderer.appendChild(head, script);
  }

  createJsonLd(product: ProductStructuredData) {
    const image = product.images.map((image) => image.src)[0];

    let baseUrl = environment.cloudflareZone;

    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    const productUrl = `${baseUrl}${product.productPageUrl}`;

    return {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.title,
      image: [image],
      description: product.summary,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'Prepp me',
      },
      offers: {
        '@type': 'Offer',
        url: productUrl,
        priceCurrency: product.price.currencyCode,
        price: product.price.amount,
        availability: 'https://schema.org/InStock',
      },
    };
  }
}
