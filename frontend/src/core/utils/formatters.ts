export function formatDate(date: string | Date): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("ru-RU");
  }
  
  export function formatPrice(price: number): string {
    return `${price.toFixed(2)} ₽`;
  }