import express from 'express';
import dotenv from 'dotenv';
import {authRoutes} from './routes/authRoutes';
import { skinportService } from './routes/skinportRoutes';
import { purchaseProduct } from './routes/productRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/items', skinportService)
app.use('/product', purchaseProduct)


const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
