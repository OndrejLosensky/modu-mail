import { TemplateConfig, UserTemplate } from '@/types/editor';

export class TemplateManager {
  private templates: Map<string, TemplateConfig> = new Map();
  private userTemplates: Map<string, UserTemplate> = new Map();

  // Template Management
  registerTemplate(template: TemplateConfig): void {
    if (this.templates.has(template.id)) {
      throw new Error(`Template with id ${template.id} is already registered`);
    }
    this.templates.set(template.id, template);
  }

  getTemplate(id: string): TemplateConfig | undefined {
    return this.templates.get(id);
  }

  getAllTemplates(): TemplateConfig[] {
    return Array.from(this.templates.values());
  }

  getTemplatesByCategory(category: string): TemplateConfig[] {
    return this.getAllTemplates().filter(template => template.category === category);
  }

  getTemplatesByTags(tags: string[]): TemplateConfig[] {
    return this.getAllTemplates().filter(template => 
      template.tags?.some(tag => tags.includes(tag))
    );
  }

  // User Template Management (prepared for Supabase)
  async createUserTemplate(template: UserTemplate): Promise<void> {
    // TODO: When Supabase is integrated, this will create a template in the database
    this.userTemplates.set(template.id, template);
  }

  async updateUserTemplate(template: UserTemplate): Promise<void> {
    // TODO: When Supabase is integrated, this will update a template in the database
    if (!this.userTemplates.has(template.id)) {
      throw new Error(`Template with id ${template.id} does not exist`);
    }
    this.userTemplates.set(template.id, template);
  }

  async deleteUserTemplate(id: string): Promise<void> {
    // TODO: When Supabase is integrated, this will delete a template from the database
    if (!this.userTemplates.delete(id)) {
      throw new Error(`Template with id ${id} does not exist`);
    }
  }

  async getUserTemplates(userId: string): Promise<UserTemplate[]> {
    // TODO: When Supabase is integrated, this will fetch templates from the database
    return Array.from(this.userTemplates.values())
      .filter(template => template.userId === userId);
  }

  async getPublicTemplates(): Promise<UserTemplate[]> {
    // TODO: When Supabase is integrated, this will fetch public templates from the database
    return Array.from(this.userTemplates.values())
      .filter(template => template.sharing.public);
  }

  async getSharedTemplates(userId: string): Promise<UserTemplate[]> {
    // TODO: When Supabase is integrated, this will fetch templates shared with the user
    return Array.from(this.userTemplates.values())
      .filter(template => 
        template.sharing.users?.includes(userId) ||
        template.sharing.organizations?.includes(template.organizationId ?? '')
      );
  }

  // Analytics (prepared for Supabase)
  async incrementTemplateViews(id: string): Promise<void> {
    // TODO: When Supabase is integrated, this will increment views in the database
    const template = this.userTemplates.get(id);
    if (template && template.analytics) {
      template.analytics.views++;
      this.userTemplates.set(id, template);
    }
  }

  async incrementTemplateDownloads(id: string): Promise<void> {
    // TODO: When Supabase is integrated, this will increment downloads in the database
    const template = this.userTemplates.get(id);
    if (template && template.analytics) {
      template.analytics.downloads++;
      this.userTemplates.set(id, template);
    }
  }

  async updateTemplateRating(id: string, rating: number): Promise<void> {
    // TODO: When Supabase is integrated, this will update rating in the database
    const template = this.userTemplates.get(id);
    if (template && template.analytics) {
      template.analytics.rating = rating;
      this.userTemplates.set(id, template);
    }
  }
}

export const templateManager = new TemplateManager();
export default templateManager; 