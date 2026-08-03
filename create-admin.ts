import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/common/enums';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  // Initialisation du contexte NestJS sans démarrer le serveur HTTP
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  // Récupération des arguments transmis en ligne de commande
  const args = process.argv.slice(2);
  const email = args[0] || 'admin@example.com';
  const password = args[1] || 'Admin1234!';
  const nom = args[2] || 'Admin';
  const prenom = args[3] || 'System';

  try {
    // Vérification si l'admin existe déjà
    const existingUser = await usersService.findByEmail(email);
    if (existingUser) {
      console.error(
        `❌ Erreur: Un utilisateur avec l'email "${email}" existe déjà.`,
      );
      await app.close();
      process.exit(1);
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'administrateur
    await usersService.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role: Role.ADMIN,
      age: 30, // Valeurs par défaut si requises par ton entité
      numero: '+2250000000000',
      sexe: 'M',
    });

    console.log('✅ Administrateur créé avec succès !');
    console.log(`📧 Email    : ${email}`);
    console.log(`🔑 Password : ${password}`);
    console.log(`👑 Rôle     : ${Role.ADMIN}`);
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'administrateur :", error);
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
