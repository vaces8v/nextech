"use client";

import { Icon } from "@iconify/react";
import { Card, CardBody, CardHeader } from "@heroui/card";

const companyTeam = [
  {
    name: "Максим Петров",
    role: "Технический директор",
    bio: "Эксперт в области разработки программного обеспечения и облачных технологий.",
    icon: "mdi:code-tags",
  },
];

const companyMilestones = [
  {
    year: 2018,
    event: "Основание компании nexTech",
  },
  {
    year: 2020,
    event: "Запуск первой версии платформы trade-in",
  },
  {
    year: 2022,
    event: "Расширение сервисов на территорию всей России",
  },
];

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        О Компании nexTech
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader className="flex justify-center items-center gap-4">
            <Icon className="text-4xl text-primary" icon="mdi:information" />
            <h2 className="text-2xl font-semibold">Наша История</h2>
          </CardHeader>
          <CardBody>
            <p className="text-lg text-default-600 mb-4">
              nexTech - инновационная технологическая компания,
              специализирующаяся на решениях в сфере электронной коммерции и
              trade-in услуг. Мы помогаем клиентам максимально выгодно и удобно
              обновлять свои электронные устройства.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {companyMilestones.map((milestone, index) => (
                <div
                  key={index}
                  className="bg-default-100 p-4 rounded-lg text-center"
                >
                  <h3 className="text-xl font-bold text-primary">
                    {milestone.year}
                  </h3>
                  <p className="text-default-600">{milestone.event}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex justify-center items-center gap-4">
            <Icon className="text-4xl text-primary" icon="mdi:account-group" />
            <h2 className="text-2xl font-semibold">Наша Команда</h2>
          </CardHeader>
          <CardBody>
            <div className="grid md:grid-cols-3 gap-4">
              {companyTeam.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon
                      className="text-6xl text-primary"
                      icon={member.icon}
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-default-600 font-medium">{member.role}</p>
                  <p className="text-default-500 mt-2">{member.bio}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex justify-center items-center gap-4">
            <Icon className="text-4xl text-primary" icon="mdi:target" />
            <h2 className="text-2xl font-semibold">Наша Миссия</h2>
          </CardHeader>
          <CardBody>
            <p className="text-lg text-default-600 text-center">
              Мы стремимся сделать процесс обмена и продажи электронных
              устройств максимально простым, прозрачным и выгодным для наших
              клиентов.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
