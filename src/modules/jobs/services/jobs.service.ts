import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Job } from '../utils';

@Injectable({ providedIn: 'root' })
export class JobsService {
  public readonly sortList: Signal<string[]> = signal([
    'Top match',
    'Newest',
    'Latest',
  ]);

  public filteredJobs: WritableSignal<Job[]> = signal([]);

  readonly #jobList: Signal<Job[]> = signal([
    {
      title: 'Gaming UI designer',
      description: 'Rockstar Games',
      img: 'assets/icons/job1.svg',
      location: 'El Mansoura, Egypt',
      datePosted: '10 days ago',
      requirements: ['0 - 3y of exp', 'Full time', 'Remote'],
      categories: ['Creative / Design', 'IT / Software development', 'Gaming'],
    },
    {
      title: 'Senior UX UI Designer',
      description: 'Egabi',
      img: 'assets/icons/job2.svg',
      location: 'Cairo, Egypt',
      datePosted: '1 month ago',
      requirements: ['0 - 3y of exp', 'Full time', 'Hybrid'],
      categories: ['Creative / Design', 'IT / Software development'],
    },
    {
      title: 'React Frontend developer',
      description: 'Mangara',
      img: 'assets/icons/job3.svg',
      location: 'Cairo, Egypt',
      datePosted: '1 month ago',
      requirements: ['5 - 7y of exp', 'Freelance', 'Remote'],
      categories: ['Creative / Design', 'IT / Software development'],
    },
    {
      title: 'Gaming UI designer',
      description: 'Rockstar Games',
      img: 'assets/icons/job1.svg',
      location: 'El Mansoura, Egypt',
      datePosted: '10 days ago',
      requirements: ['0 - 3y of exp', 'Full time', 'Remote'],
      categories: ['Creative / Design', 'IT / Software development', 'Gaming'],
    },
  ]);

  public filterJobs = (search: string): void => {
    if (!search) return this.filteredJobs.set(this.#jobList());

    const lowerCaseSearch = search.toLowerCase();

    this.filteredJobs.set(
      this.#jobList().filter(
        (job) =>
          job.title.toLowerCase().includes(lowerCaseSearch) ||
          job.description.toLowerCase().includes(lowerCaseSearch)
      )
    );
  };
}
