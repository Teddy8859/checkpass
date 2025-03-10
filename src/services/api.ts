import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export interface Pass {
  id: string;
  plateNumber: string;
  zone: string;
  startDate: string;
  endDate: string;
  type: string;
  period: string;
  status: string;
  daysLeft: number;
}

export const api = {
  async getPasses(plateNumber: string): Promise<Pass[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/passes/${plateNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching passes:', error);
      throw error;
    }
  }
}; 