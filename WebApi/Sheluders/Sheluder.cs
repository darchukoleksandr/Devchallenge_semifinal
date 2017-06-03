using System;
using System.Collections.Specialized;
using Quartz;
using Quartz.Impl;

namespace WebApi.Sheluders
{
    public static class Sheluder
    {
        private static IScheduler _scheduler;
        private static ITrigger _testTrigger;
        private static IJobDetail _testJob;
        
        public static void StartScheduler()
        {
            var properties = new NameValueCollection
            {
                ["quartz.serializer.type"] = "json",
            };

            var schedulerFactory = new StdSchedulerFactory(properties);
            _scheduler = schedulerFactory.GetScheduler().Result;
            _scheduler.Start().Wait();

            _testJob = JobBuilder.Create<UpdateAllDocumentsJob>()
                .Build();
            _testTrigger = TriggerBuilder.Create()
                .StartNow()
                .WithSimpleSchedule(builder => builder.WithIntervalInHours(3).RepeatForever())
                .Build();

            _scheduler.ScheduleJob(_testJob, _testTrigger).Wait();
        }

        public static void UpdateSheluder(TimeSpan interval)
        {
            var newTrigger = TriggerBuilder.Create()
                .StartNow()
                .WithSimpleSchedule(builder => builder.WithIntervalInSeconds((int) interval.TotalSeconds).RepeatForever())
                .Build();

            _scheduler.RescheduleJob(_testTrigger.Key, newTrigger);

            _testTrigger = newTrigger;
        }
    }
}
