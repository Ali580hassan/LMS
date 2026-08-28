import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { Category } from './entities/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Helper method: Entire categories list ka cache invalidate karne ke liye
  private async clearAllCategoriesCache(): Promise<void> {
    await this.cacheManager.del('all_categories');
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(dto);
    const savedCategory = await this.categoryRepository.save(category);

    // ⚡ CACHE INVALIDATION: New category add hui to full list cache clear karein
    await this.clearAllCategoriesCache();

    return savedCategory;
  }

  async findAll(): Promise<Category[]> {
    const cacheKey = 'all_categories';

    const cachedCategories = await this.cacheManager.get<Category[]>(cacheKey);
    if (cachedCategories) {
      console.log(`✅ CACHE HIT — ${cacheKey}`);
      return cachedCategories;
    }
    console.log(`❌ CACHE MISS — ${cacheKey}`);

    const categories = await this.categoryRepository.find();
    await this.cacheManager.set(cacheKey, categories, 86400000);
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const cacheKey = `category_details_${id}`;

    const cachedCategory = await this.cacheManager.get<Category>(cacheKey);
    if (cachedCategory) {
      console.log(`✅ CACHE HIT — ${cacheKey}`);
      return cachedCategory;
    }
    console.log(`❌ CACHE MISS — ${cacheKey}`);

    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.cacheManager.set(cacheKey, category, 86400000);
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, dto);

    const updatedCategory = await this.categoryRepository.save(category);

    // ⚡ CACHE INVALIDATION: Specific category aur full list dono ka cache invalidate karein
    await this.cacheManager.del(`category_details_${id}`);
    await this.clearAllCategoriesCache();

    return updatedCategory;
  }

  async remove(id: number): Promise<{ message: string }> {
    const category = await this.findOne(id);

    await this.categoryRepository.remove(category);

    // ⚡ CACHE INVALIDATION: Deleted category cache flush karein
    await this.cacheManager.del(`category_details_${id}`);
    await this.clearAllCategoriesCache();

    return { message: 'Category deleted successfully' };
  }
}
