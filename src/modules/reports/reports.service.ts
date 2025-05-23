import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async findAll() {
    const reports = await this.reportRepository.find();
    return reports;
  }
  createReport(reportDto: CreateReportDto, user: User) {
    const report = this.reportRepository.create(reportDto as Report);
    console.log(user);
    report.user = user;
    return this.reportRepository.save(report);
  }
}
