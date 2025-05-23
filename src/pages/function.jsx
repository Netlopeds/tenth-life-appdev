function search(products, searchTerm) 
{
    if (!searchTerm) return products;
  
    return products.filter
    (product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}
  
  export default search;
  