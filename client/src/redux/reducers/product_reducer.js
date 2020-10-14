import { 
    GET_PRODUCT_BY_SELL,
    GET_PRODUCT_BY_ARRIVAL,
    GET_GENRES,
    GET_MATERIALS
} from "../actions/types";



export default function(state={},action){
    switch(action.type){
        case GET_PRODUCT_BY_SELL:
            return {...state, bySell: action.payload}
        case GET_PRODUCT_BY_ARRIVAL:
            return {...state, byArrival: action.payload}
        case GET_GENRES:
            return {...state, byGenres: action.payload}
        case GET_MATERIALS:
            return {...state, byMaterials: action.payload}
        default:
            return state;
    }
}