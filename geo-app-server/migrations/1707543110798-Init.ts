import { MigrationInterface, QueryRunner } from "typeorm";
import csv from 'csv-parser'
import * as fs from 'fs'
import path from 'path'
import { User, UserRoles } from "../app/entities/user.entity";
import { Section } from "../app/entities/section.entity";
import { Topic } from "../app/entities/topic.entity";
import { Task } from "../app/entities/task.entity";


function readCSVFile<T>(pathToCSV: string, onData: (item: T) => Promise<void>) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.resolve(pathToCSV))
        .pipe(csv({ mapValues: ({ value }) => {
            const vs = {
                'True': true,
                'False': false,
                'NULL': null
            }

            if (value in vs) return vs[value]
            return value
        }}))
        .on('data', onData)
        .on('end', resolve)
        .on('error', reject)
    })
}
export class Init1707543110798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await readCSVFile<any>('./migrations/user.csv', async (user) => {
            console.log(user)
                const createdUser = queryRunner.manager.create(User, {
                    username: user.username,
                    password: user.password,
                    role: user.role as UserRoles,
                    isPremium: user.isPremium,
                    currentSection: user.currentSectionId,
                });
                await queryRunner.manager.save(createdUser)
        });

        await readCSVFile<any>('./migrations/section.csv', async (section) => {
            console.log(section)
            const createdSection = queryRunner.manager.create(Section, {
                title: section.title,
                imageUrl: section.imageUrl,
            })
            await queryRunner.manager.save(createdSection)
        });

        await readCSVFile<any>('./migrations/topic.csv', async (topic) => {
            console.log(topic)
            const createdTopic = queryRunner.manager.create(Topic, {
                // @ts-ignore
                title: topic.title,
                text: topic.text,
                videoId: topic.videoId,
                isPremium: topic.isPremium,
                order: topic.order,
                section: topic.sectionId
            })
            await queryRunner.manager.save(createdTopic)
        });

        await readCSVFile<any>('./migrations/task.csv', async (task) => {
            const createdTask = queryRunner.manager.create(Task, {
                topic: task.topicId,
                ka: task.ka,
                ru: task.ru,
                transcription: task.transcription,
                soundUrl: task.soundUrl,
                imageUrl: task.imageUrl,
            })
            await queryRunner.manager.save(createdTask)
        });

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
