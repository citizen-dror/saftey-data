import Redis from 'ioredis';

class RedisClient {
  private static instance: Redis | null = null;
  private static redisEnabled = process.env.REDIS_ENABLED === 'true';

  public static getClient(): Redis | null {
    if (!this.redisEnabled) return null; // Return null if Redis is disabled

    if (!this.instance) {
      try {
        this.instance = new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: Number(process.env.REDIS_PORT) || 6379,
          retryStrategy: (times) => Math.min(times * 50, 2000), // Retry with delay
        });

        this.instance.on('error', (err) => {
          console.error('Redis Error:', err);
          this.instance?.disconnect(); // Avoid keeping a broken connection
          this.instance = null; // Mark Redis as unavailable
        });

      } catch (error) {
        console.error('Failed to initialize Redis:', error);
        this.instance = null;
      }
    }
    return this.instance;
  }
}

export default RedisClient;
