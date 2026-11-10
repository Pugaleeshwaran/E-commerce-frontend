import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

// Async thunk to fetch Products by Collection and optional Filters
export const fetchProductsByFilters = createAsyncThunk(
    "products/fetchByFilters",
    async ({
        collection,
        size,
        color,
        gender,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit,
    }) => {
        const quary = new URLSearchParams();
        if (collection) quary.append("collection", collection)
        if (size) quary.append("size", size)
        if (color) quary.append("color", color)
        if (gender) quary.append("gender", gender)
        if (minPrice) quary.append("minPrice", minPrice)
        if (maxPrice) quary.append("maxPrice", maxPrice)
        if (sortBy) quary.append("sortBy", sortBy)
        if (search) quary.append("search", search)
        if (category) quary.append("category", category)
        if (material) quary.append("material", material)
        if (brand) quary.append("brand", brand)
        if (limit) quary.append("limit", limit)

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${quary.toString()}`);
        return response.data
        console.log(response.data);

    }
);

//Async Thunk to fetch a Single product by ID
export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails", async (id) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        return response.data;
    }
);

//Async thunk to fetch similar products
export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, productDate }) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productDate,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        }
    );
    return response.data;
});

//Async thunk to fetch similar producta
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts", async ({ id }) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`);
        return response.data;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: null,//Store the details of the single Product
        similarProducts: [],
        loading: false,
        error: null,
        filters: {
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            material: "",
            collection: "",
        },
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                size: "",
                color: "",
                gender: "",
                brand: "",
                minPrice: "",
                maxPrice: "",
                sortBy: "",
                search: "",
                material: "",
                collection: "",
            };
        },
    },
    extraReducers: (builder) => {
        builder
            //handle fetching products with filter
            .addCase(fetchProductsByFilters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchProductsByFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //Handle fetching single product details
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //handle update product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
                const index = state.products.findIndex(
                    (product) => product._id === updateProduct._id
                );
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.similarProducts = action.payload;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setFilters, clearFilters } = productsSlice.actions
export default productsSlice.reducer;
