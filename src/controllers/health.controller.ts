import { Request, Response } from 'express';

export class HealthController {
    async get(req: Request, res: Response) {
        try {
            console.log('OK');

            return res.status(200).json({
                message: 'OK',
            });
        } catch (error) {
            console.error("Error fetching items:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
