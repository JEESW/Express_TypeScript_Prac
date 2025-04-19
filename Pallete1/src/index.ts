import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import app from './app';

const PORT = 3000;

AppDataSource.initialize().then(() => {
    console.log('Data Source has been initialized!');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Error during Data Source initialization:', err);
});