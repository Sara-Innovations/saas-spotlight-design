const BARGAIN_URL = import.meta.env.VITE_BARGAIN_URL || "http://bargainshop.test";
const TRADING_URL = import.meta.env.VITE_TRADING_URL || "http://tradinghub.test";

// Use relative API path for development (proxied by Vite), full URL for production
const isDevelopment = import.meta.env.DEV;
const TRADING_API_BASE_URL = isDevelopment ? "/api" : `${TRADING_URL}/api`;
const BARGAIN_API_BASE_URL = isDevelopment ? "/api" : `${BARGAIN_URL}/api`;
const API_BASE_URL = TRADING_API_BASE_URL;

export interface Pagination {
  total: number;
  limit: number;
  current_page: number;
  total_pages: number;
}

export interface Business {
  id: string;
  cname: string;
  cmobile: string;
  cemail: string;
  cwebsite: string;
  abn: string;
  acn: string;
  postcode: string;
  streetnumber: string;
  streetname: string;
  businesssuberb: string;
  state: string;
  category_name: string;
  b_cat_id: string;
  b_s_cat_id?: string;
  // Mock fields that might be missing in DB but needed by UI
  rating?: string;
  reviews?: string;
  description?: string;
  cmap?: string;
}

export interface Category {
  id: string;
  category_name: string;
}

export interface BusinessDetailsData {
  business: Business;
  sub_category: any;
  about: any;
  services: any[];
  clients: any[];
  gallery: any[];
  experts: any[];
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  pagination?: Pagination;
  message?: string;
}

export const fetchBusinesses = async ({
  search,
  category_id,
  sub_category_id,
  location,
  page = 1,
  limit = 10
}: {
  search?: string,
  category_id?: string,
  sub_category_id?: string,
  location?: string,
  page?: number,
  limit?: number
}) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  // If any search criteria is provided, use the search endpoint
  const isSearching = search || category_id || sub_category_id || location;
  const baseUrl = isSearching ? `${BARGAIN_URL}/api/business/search` : `${BARGAIN_URL}/api/business/list`;

  if (search) params.append("q", search);
  if (category_id && category_id !== "all") params.append("category_id", category_id);
  if (sub_category_id && sub_category_id !== "all") params.append("sub_category_id", sub_category_id);
  if (location) params.append("location", location);

  const response = await fetch(`${baseUrl}?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch businesses");
  }
  return response.json() as Promise<ApiResponse<Business[]>>;
};

export const fetchBusinessDetails = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/businesses/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch business details");
  }
  return response.json() as Promise<ApiResponse<BusinessDetailsData>>;
};

export const fetchCategories = async () => {
  const response = await fetch(`${BARGAIN_URL}/api/business/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json() as Promise<ApiResponse<Category[]>>;
};

export const fetchSubCategories = async (categoryId: string) => {
  if (!categoryId || categoryId === "all") return { status: "success", data: [] };
  
  const response = await fetch(`${BARGAIN_URL}/api/business/sub-categories?category_id=${categoryId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch sub-categories");
  }
  return response.json() as Promise<ApiResponse<any[]>>;
};


export const registerBusiness = async (data: any) => {
  // Call Trading Hub API
  const tradingPromise = fetch(`${TRADING_API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Call Bargain Shop API
  const bargainPromise = fetch(`${BARGAIN_API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Wait for both to complete
  const [tradingRes, bargainRes] = await Promise.allSettled([tradingPromise, bargainPromise]);

  let errorMessage = "";
  let successData = null;

  if (tradingRes.status === "fulfilled" && tradingRes.value.ok) {
    successData = await tradingRes.value.json();
  } else if (tradingRes.status === "fulfilled") {
    const errorData = await tradingRes.value.json().catch(() => ({}));
    errorMessage += `Trading Hub Error: ${errorData.message || "Failed"}. `;
  } else {
    errorMessage += `Trading Hub connection failed: ${tradingRes.reason?.message || "Network Error"}. `;
  }

  if (bargainRes.status === "fulfilled" && bargainRes.value.ok) {
    // Successfully registered in bargain shop too
    if (!successData) successData = await bargainRes.value.json();
  } else if (bargainRes.status === "fulfilled") {
    const errorData = await bargainRes.value.json().catch(() => ({}));
    errorMessage += `Bargain Shop Error: ${errorData.message || "Failed"}. `;
  } else {
    errorMessage += `Bargain Shop connection failed: ${bargainRes.reason?.message || "Network Error"}. `;
  }

  if (errorMessage && !successData) {
    throw new Error(errorMessage);
  }

  return successData || { status: "success", message: "Registration partially successful" };
};

export const fetchProducts = async ({
  page = 0,
  search = "",
  category = ""
}: {
  page?: number,
  search?: string,
  category?: string
}) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (search) params.append("searching", search);
  if (category) params.append("category", category);

  const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json() as Promise<ApiResponse<any[]>>;
};

export const fetchProductDetails = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return response.json() as Promise<ApiResponse<any>>;
};

// Jobs API - Fetch all active jobs from all companies
export const fetchJobs = async ({
  page = 1,
  limit = 10,
  search = ""
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (search) params.append("search", search);

  // Use bargainshop API endpoint
  const response = await fetch(`${BARGAIN_URL}/api_jobs/list?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
};

export const fetchJobDetails = async (id: string) => {
  const response = await fetch(`${BARGAIN_URL}/api_jobs/details/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch job details");
  }
  return response.json();
};

export const fetchBargainProducts = async (page: number = 1, limit: number = 20) => {
  const response = await fetch(`${BARGAIN_API_BASE_URL}/products?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch bargain products");
  }
  return response.json() as Promise<ApiResponse<any[]>>;
};

export const fetchBargainProductDetails = async (id: string) => {
  const response = await fetch(`${BARGAIN_API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch bargain product details");
  }
  return response.json() as Promise<ApiResponse<any>>;
};

// Search products API - fetches all products for client-side filtering
export const searchBargainProducts = async (query: string, page: number = 1, limit: number = 100) => {
  // Use regular products API to get full product data with IDs
  return fetchBargainProducts(page, limit);
};

// Review interfaces and functions
export interface Review {
  id: string;
  product_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
  helpful_count?: number;
}

export interface ProductReviewsResponse {
  reviews: Review[];
  average_rating: number;
  total_reviews: number;
  rating_distribution: Record<number, number>;
}

export const fetchProductReviews = async (productId: string): Promise<ProductReviewsResponse> => {
  // Use new API endpoint that properly fetches from product_rating table
  const response = await fetch(`${BARGAIN_API_BASE_URL.replace('/api', '')}/api_products/reviews/${productId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product reviews");
  }

  const data = await response.json();

  // Transform the response to match expected format
  return {
    average_rating: data.data?.average_rating || 0,
    total_reviews: data.data?.total_reviews || 0,
    rating_distribution: data.data?.rating_distribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    reviews: (data.data?.reviews || []).map((r: any) => ({
      id: r.id,
      product_id: productId,
      user_name: r.customername || 'Anonymous',
      rating: parseInt(r.rating_main_number_value) || 0,
      comment: r.written_review || r.rating_main_text_value || '',
      created_at: r.date || r.created_at,
      profile_picture: r.profile_picture || null,
      product_review_images_urls: r.product_review_images_urls || [],
    })),
  };
};

export const submitProductReview = async (productId: string, review: {
  rating: number;
  comment: string;
  user_name: string;
}): Promise<ApiResponse<Review>> => {
  const response = await fetch(`${BARGAIN_API_BASE_URL}/products/${productId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!response.ok) {
    throw new Error("Failed to submit review");
  }
  return response.json();
};

// Cart interfaces and functions
export interface CartItem {
  product_id: string;
  product_name: string;
  price: number;
  display_price: number;
  quantity: number;
  image_url: string;
  business_name: string;
  max_quantity: number;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  total_price: number;
}

export const getCart = (): Cart => {
  if (typeof window === 'undefined') return { items: [], total_items: 0, total_price: 0 };

  const cartData = localStorage.getItem('bargain_cart');
  if (!cartData) return { items: [], total_items: 0, total_price: 0 };

  try {
    const cart = JSON.parse(cartData);
    return {
      items: cart.items || [],
      total_items: cart.total_items || 0,
      total_price: cart.total_price || 0,
    };
  } catch {
    return { items: [], total_items: 0, total_price: 0 };
  }
};

export const addToCart = (product: any, quantity: number = 1): Cart => {
  const cart = getCart();
  const existingItemIndex = cart.items.findIndex(item => item.product_id === product.product_id);

  if (existingItemIndex >= 0) {
    // Update existing item
    const newQuantity = Math.min(cart.items[existingItemIndex].quantity + quantity, product.qty || 999);
    cart.items[existingItemIndex].quantity = newQuantity;
  } else {
    // Add new item
    const cartItem: CartItem = {
      product_id: product.product_id,
      product_name: product.product_name,
      price: product.price || 0,
      display_price: product.display_price || product.price || 0,
      quantity: Math.min(quantity, product.qty || 999),
      image_url: product.image_url || '',
      business_name: product.business_name || '',
      max_quantity: product.qty || 999,
    };
    cart.items.push(cartItem);
  }

  // Recalculate totals
  cart.total_items = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.total_price = cart.items.reduce((sum, item) => sum + (item.display_price * item.quantity), 0);

  // Save to localStorage
  localStorage.setItem('bargain_cart', JSON.stringify(cart));

  return cart;
};

export const updateCartItemQuantity = (productId: string, quantity: number): Cart => {
  const cart = getCart();
  const itemIndex = cart.items.findIndex(item => item.product_id === productId);

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = Math.min(quantity, cart.items[itemIndex].max_quantity);
    }

    // Recalculate totals
    cart.total_items = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.total_price = cart.items.reduce((sum, item) => sum + (item.display_price * item.quantity), 0);

    // Save to localStorage
    localStorage.setItem('bargain_cart', JSON.stringify(cart));
  }

  return cart;
};

export const removeFromCart = (productId: string): Cart => {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.product_id !== productId);

  // Recalculate totals
  cart.total_items = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.total_price = cart.items.reduce((sum, item) => sum + (item.display_price * item.quantity), 0);

  // Save to localStorage
  localStorage.setItem('bargain_cart', JSON.stringify(cart));

  return cart;
};

export const clearCart = (): Cart => {
  const emptyCart = { items: [], total_items: 0, total_price: 0 };
  localStorage.setItem('bargain_cart', JSON.stringify(emptyCart));
  return emptyCart;
};

// Wishlist interfaces and functions
export interface WishlistItem {
  product_id: string;
  product_name: string;
  price: number;
  display_price: number;
  image_url: string;
  business_name: string;
  added_at: string;
}

export const getWishlist = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];

  const wishlistData = localStorage.getItem('bargain_wishlist');
  if (!wishlistData) return [];

  try {
    return JSON.parse(wishlistData);
  } catch {
    return [];
  }
};

export const addToWishlist = (product: any): WishlistItem[] => {
  const wishlist = getWishlist();
  const exists = wishlist.some(item => item.product_id === product.product_id);

  if (!exists) {
    const wishlistItem: WishlistItem = {
      product_id: product.product_id,
      product_name: product.product_name,
      price: product.price || 0,
      display_price: product.display_price || product.price || 0,
      image_url: product.image_url || '',
      business_name: product.business_name || '',
      added_at: new Date().toISOString(),
    };
    wishlist.push(wishlistItem);
    localStorage.setItem('bargain_wishlist', JSON.stringify(wishlist));
  }

  return wishlist;
};

export const removeFromWishlist = (productId: string): WishlistItem[] => {
  const wishlist = getWishlist().filter(item => item.product_id !== productId);
  localStorage.setItem('bargain_wishlist', JSON.stringify(wishlist));
  return wishlist;
};

export const isInWishlist = (productId: string): boolean => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.product_id === productId);
};