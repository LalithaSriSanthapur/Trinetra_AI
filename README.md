# Trinetra – n8n Automation Workflows

This repository contains the **n8n automation workflows** developed for **Trinetra**, an AI-powered smart surveillance system designed to automate emergency response and notifications based on detected incidents.

## Overview

The workflows automate communication and alerting processes after an incident is detected. They are designed to reduce response time by instantly notifying the appropriate people through multiple communication channels.

## Features

* 📧 Automated email notifications
* 📱 SMS alerts
* 🔔 Real-time notifications
* ⚡ Workflow automation using n8n
* 🔄 Event-driven trigger and response system
* 🛠 Easily customizable for different incident types

## Repository Contents

* `*.json` – Exported n8n workflow(s) that can be directly imported into n8n.

## Technologies Used

* n8n
* SMTP (Email)
* SMS Service Integration
* Webhooks
* HTTP Requests

## Importing the Workflow

1. Download the JSON workflow file.
2. Open your n8n instance.
3. Click **Import Workflow**.
4. Select the JSON file.
5. Configure your credentials (Email, SMS provider, Webhooks, etc.).
6. Activate the workflow.

## Use Case

When Trinetra detects a critical incident through its AI surveillance pipeline, these workflows automatically:

* Send email alerts to designated recipients.
* Trigger SMS notifications for urgent situations.
* Generate real-time notifications.
* Automate the communication pipeline without manual intervention.

## Project

This repository is part of the **Trinetra** project, an AI-powered intelligent surveillance platform focused on enabling faster emergency response through automated monitoring and communication.
