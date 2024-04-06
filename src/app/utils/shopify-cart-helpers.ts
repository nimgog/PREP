import type { ShoppingCartFragment } from 'src/app/graphql/types';
import type {
  LineItem,
  ShoppingCart,
} from 'src/app/models/shopping-cart.model';

export const mapCart = (
  cartFragment: ShoppingCartFragment | null | undefined
): ShoppingCart => {
  if (!cartFragment) {
    throw new Error('Failed to map cart as it was unavailable');
  }

  const lines: LineItem[] = cartFragment.lines.nodes.map((shopifyLineItem) => {
    const {
      merchandise: { id: productId, product, image: productImage },
    } = shopifyLineItem;

    const lineItem: LineItem = {
      id: shopifyLineItem.id,
      product: {
        id: productId,
        title: `TODO: Product title`,
        subtitle: `TODO: Product subtitle`,
        imageUrl: productImage?.url,
      },
      totalPrice: {
        amount: parseFloat(shopifyLineItem.cost.totalAmount.amount),
        currencyCode: shopifyLineItem.cost.totalAmount.currencyCode,
      },
      quantity: shopifyLineItem.quantity,
    };

    const lineItemOriginalTotalPrice = {
      amount: parseFloat(shopifyLineItem.cost.subtotalAmount.amount),
      currencyCode: shopifyLineItem.cost.subtotalAmount.currencyCode,
    };

    if (lineItem.totalPrice.amount < lineItemOriginalTotalPrice.amount) {
      lineItem.originalTotalPrice = lineItemOriginalTotalPrice;
    }

    return lineItem;
  });

  const cart: ShoppingCart = {
    id: cartFragment.id,
    checkoutUrl: cartFragment.checkoutUrl,
    lines,
    totalPrice: {
      amount: parseFloat(cartFragment.cost.totalAmount.amount),
      currencyCode: cartFragment.cost.totalAmount.currencyCode,
    },
    totalQuantity: cartFragment.totalQuantity,
  };

  const cartOriginalTotalPrice = {
    amount: lines
      .map((lineItem) => lineItem.originalTotalPrice || lineItem.totalPrice)
      .reduce((sum, currentPrice) => sum + currentPrice.amount, 0),
    currencyCode: cartFragment.cost.totalAmount.currencyCode,
  };

  if (cart.totalPrice.amount < cartOriginalTotalPrice.amount) {
    cart.originalTotalPrice = cartOriginalTotalPrice;
  }

  return cart;
};
